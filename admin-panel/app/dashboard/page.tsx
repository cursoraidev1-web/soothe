'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  FileText,
  Lightbulb,
  Newspaper,
  Briefcase,
  Users,
  Mail,
  Plus,
  TrendingUp,
} from 'lucide-react'
import { api } from '@/lib/api'
import { toast } from 'sonner'

interface Stats {
  pages: number
  solutions: number
  blogPosts: number
  careers: number
  applicants: number
  contacts: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState<Stats>({
    pages: 0,
    solutions: 0,
    blogPosts: 0,
    careers: 0,
    applicants: 0,
    contacts: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      // Fetch counts from various endpoints
      const [pages, solutions, blog, careers, applicants, contacts] = await Promise.all([
        api.get<any>('/pages?limit=1').catch(() => ({ meta: { total: 0 } })),
        api.get<any>('/solutions?limit=1').catch(() => ({ meta: { total: 0 } })),
        api.get<any>('/blog?limit=1').catch(() => ({ meta: { total: 0 } })),
        api.get<any>('/careers?limit=1').catch(() => ({ meta: { total: 0 } })),
        api.get<any>('/admin/applicants?limit=1').catch(() => ({ meta: { total: 0 } })),
        api.get<any>('/admin/contact-submissions?limit=1').catch(() => ({ meta: { total: 0 } })),
      ])

      setStats({
        pages: pages.meta?.total || 0,
        solutions: solutions.meta?.total || 0,
        blogPosts: blog.meta?.total || 0,
        careers: careers.meta?.total || 0,
        applicants: applicants.meta?.total || 0,
        contacts: contacts.meta?.total || 0,
      })
    } catch (error: any) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Pages',
      value: stats.pages,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      href: '/pages',
    },
    {
      title: 'Solutions',
      value: stats.solutions,
      icon: Lightbulb,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      href: '/solutions',
    },
    {
      title: 'Blog Posts',
      value: stats.blogPosts,
      icon: Newspaper,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      href: '/blog',
    },
    {
      title: 'Careers',
      value: stats.careers,
      icon: Briefcase,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      href: '/careers',
    },
    {
      title: 'Applicants',
      value: stats.applicants,
      icon: Users,
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
      href: '/applicants',
    },
    {
      title: 'Contact Messages',
      value: stats.contacts,
      icon: Mail,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
      href: '/contact',
    },
  ]

  const quickActions = [
    { title: 'Create Page', href: '/pages/create', icon: FileText },
    { title: 'Create Solution', href: '/solutions/create', icon: Lightbulb },
    { title: 'Write Blog Post', href: '/blog/create', icon: Newspaper },
    { title: 'Post Job', href: '/careers/create', icon: Briefcase },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your CMS.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.title}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => router.push(stat.href)}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? '...' : stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  View all
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Button
                  key={action.title}
                  variant="outline"
                  className="h-auto flex-col gap-2 py-4"
                  onClick={() => router.push(action.href)}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm font-medium">{action.title}</span>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity - Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Activity feed coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
