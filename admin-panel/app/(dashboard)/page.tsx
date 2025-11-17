'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  FileText, 
  Lightbulb, 
  Briefcase, 
  Users, 
  Mail, 
  Image,
  Settings,
  TrendingUp 
} from 'lucide-react'
import { api } from '@/lib/api'
import Link from 'next/link'

interface DashboardStats {
  pages: number
  solutions: number
  blogPosts: number
  careers: number
  teamMembers: number
  contactSubmissions: number
  mediaFiles: number
  users: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    pages: 0,
    solutions: 0,
    blogPosts: 0,
    careers: 0,
    teamMembers: 0,
    contactSubmissions: 0,
    mediaFiles: 0,
    users: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      // Fetch counts from various endpoints
      const [pages, solutions, blog, careers, team, contact, media, users] = await Promise.allSettled([
        api.get('/pages').catch(() => ({ data: [] })),
        api.get('/solutions').catch(() => ({ data: [] })),
        api.get('/blog').catch(() => ({ data: [] })),
        api.get('/careers').catch(() => []),
        api.get('/team').catch(() => []),
        api.get('/contact-submissions').catch(() => []),
        api.get('/media').catch(() => []),
        api.get('/admin/users').catch(() => ({ data: [] })),
      ])

      setStats({
        pages: Array.isArray((pages as any).value) ? (pages as any).value.length : (pages as any).value?.data?.length || 0,
        solutions: Array.isArray((solutions as any).value) ? (solutions as any).value.length : (solutions as any).value?.data?.length || 0,
        blogPosts: Array.isArray((blog as any).value) ? (blog as any).value.length : (blog as any).value?.data?.length || 0,
        careers: Array.isArray((careers as any).value) ? (careers as any).value.length : 0,
        teamMembers: Array.isArray((team as any).value) ? (team as any).value.length : 0,
        contactSubmissions: Array.isArray((contact as any).value) ? (contact as any).value.length : 0,
        mediaFiles: Array.isArray((media as any).value) ? (media as any).value.length : 0,
        users: Array.isArray((users as any).value) ? (users as any).value.length : (users as any).value?.data?.length || 0,
      })
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { title: 'Pages', value: stats.pages, icon: FileText, href: '/pages', color: 'text-blue-600' },
    { title: 'Solutions', value: stats.solutions, icon: Lightbulb, href: '/solutions', color: 'text-purple-600' },
    { title: 'Blog Posts', value: stats.blogPosts, icon: FileText, href: '/blog', color: 'text-green-600' },
    { title: 'Careers', value: stats.careers, icon: Briefcase, href: '/careers', color: 'text-orange-600' },
    { title: 'Team Members', value: stats.teamMembers, icon: Users, href: '/team', color: 'text-pink-600' },
    { title: 'Contact Submissions', value: stats.contactSubmissions, icon: Mail, href: '/contact', color: 'text-red-600' },
    { title: 'Media Files', value: stats.mediaFiles, icon: Image, href: '/media', color: 'text-indigo-600' },
    { title: 'Users', value: stats.users, icon: Users, href: '/users', color: 'text-cyan-600' },
  ]

  const quickLinks = [
    { title: 'Create Page', href: '/pages/create', icon: FileText },
    { title: 'New Blog Post', href: '/blog/create', icon: TrendingUp },
    { title: 'Add Solution', href: '/solutions/create', icon: Lightbulb },
    { title: 'Post Job', href: '/careers/create', icon: Briefcase },
    { title: 'Site Settings', href: '/settings', icon: Settings },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to SOOTHE Technologies Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Total {stat.title.toLowerCase()}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickLinks.map((link) => (
            <Link key={link.title} href={link.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <link.icon className="h-8 w-8 mb-2 text-primary" />
                  <p className="text-sm font-medium">{link.title}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Activity tracking coming soon. This will show recent updates across all modules.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
