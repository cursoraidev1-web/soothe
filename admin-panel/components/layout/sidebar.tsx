'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useSidebarStore, useAuthStore } from '@/lib/store'
import {
  LayoutDashboard,
  FileText,
  Lightbulb,
  FolderTree,
  Newspaper,
  Briefcase,
  Users,
  UsersRound,
  Image,
  Mail,
  Eye,
  Settings,
  UserCog,
  Menu,
  X,
  LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'AUTHOR', 'VIEWER'] },
  { name: 'Pages', href: '/pages', icon: FileText, roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'] },
  { name: 'Solutions', href: '/solutions', icon: Lightbulb, roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'] },
  { name: 'Categories', href: '/categories', icon: FolderTree, roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'] },
  { name: 'Blog', href: '/blog', icon: Newspaper, roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'AUTHOR'] },
  { name: 'Careers', href: '/careers', icon: Briefcase, roles: ['SUPER_ADMIN', 'ADMIN'] },
  { name: 'Applicants', href: '/applicants', icon: Users, roles: ['SUPER_ADMIN', 'ADMIN'] },
  { name: 'Team', href: '/team', icon: UsersRound, roles: ['SUPER_ADMIN', 'ADMIN'] },
  { name: 'Media', href: '/media', icon: Image, roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'AUTHOR'] },
  { name: 'Contact', href: '/contact', icon: Mail, roles: ['SUPER_ADMIN', 'ADMIN'] },
  { name: 'Accessibility', href: '/accessibility', icon: Eye, roles: ['SUPER_ADMIN', 'ADMIN'] },
  { name: 'Settings', href: '/settings', icon: Settings, roles: ['SUPER_ADMIN', 'ADMIN'] },
  { name: 'Users', href: '/users', icon: UserCog, roles: ['SUPER_ADMIN', 'ADMIN'] },
]

export function Sidebar() {
  const pathname = usePathname()
  const { isOpen, toggle } = useSidebarStore()
  const { user, logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  const filteredNavigation = navigation.filter((item) =>
    item.roles.includes(user?.role || 'VIEWER')
  )

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">SOOTHE CMS</h1>
        <Button variant="ghost" size="icon" onClick={toggle}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transition-transform duration-200 ease-in-out',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b px-6">
            <h1 className="text-xl font-bold">SOOTHE CMS</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
            {filteredNavigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User info */}
          <div className="border-t p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-muted-foreground truncate">{user?.role}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={toggle}
        />
      )}
    </>
  )
}
