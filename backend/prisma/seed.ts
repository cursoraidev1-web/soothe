import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create super admin user
  const hashedPassword = await bcrypt.hash('Admin@123', 10);
  
  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@soothe.com' },
    update: {},
    create: {
      email: 'admin@soothe.com',
      password: hashedPassword,
      firstName: 'Super',
      lastName: 'Admin',
      role: UserRole.SUPER_ADMIN,
      isActive: true,
    },
  });

  console.log('✅ Super Admin created:', superAdmin.email);

  // Create default settings
  const settings = await prisma.settings.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      siteName: 'SOOTHE TECHNOLOGIES LIMITED',
      siteDescription: 'Revolutionary solutions for modern businesses',
      defaultMetaTitle: 'SOOTHE TECHNOLOGIES - Innovation in Action',
      defaultMetaDescription: 'Leading provider of technology solutions',
      accessibilityEnabled: true,
      contactEmail: 'contact@soothe.com',
    },
  });

  console.log('✅ Default settings created');

  // Create accessibility configuration
  const accessibility = await prisma.accessibility.upsert({
    where: { id: '00000000-0000-0000-0000-000000000002' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000002',
      statement: 'SOOTHE TECHNOLOGIES is committed to ensuring digital accessibility for people with disabilities.',
      wcagLevel: 'AA',
      guidelines: {
        perceivable: ['Provide text alternatives', 'Provide captions and alternatives'],
        operable: ['Make all functionality keyboard accessible', 'Give users enough time'],
        understandable: ['Make text readable', 'Make pages predictable'],
        robust: ['Maximize compatibility with assistive technologies'],
      },
      keyboardNavigation: true,
      screenReaderSupport: true,
      highContrastMode: true,
      textResizing: true,
      altTextRequired: true,
    },
  });

  console.log('✅ Accessibility configuration created');

  // Create solution categories
  const categories = await Promise.all([
    prisma.solutionCategory.upsert({
      where: { slug: 'cloud-services' },
      update: {},
      create: {
        name: 'Cloud Services',
        slug: 'cloud-services',
        description: 'Scalable cloud infrastructure and services',
        icon: '☁️',
        sortOrder: 1,
      },
    }),
    prisma.solutionCategory.upsert({
      where: { slug: 'ai-ml' },
      update: {},
      create: {
        name: 'AI & Machine Learning',
        slug: 'ai-ml',
        description: 'Intelligent automation and analytics',
        icon: '🤖',
        sortOrder: 2,
      },
    }),
    prisma.solutionCategory.upsert({
      where: { slug: 'cybersecurity' },
      update: {},
      create: {
        name: 'Cybersecurity',
        slug: 'cybersecurity',
        description: 'Enterprise-grade security solutions',
        icon: '🔒',
        sortOrder: 3,
      },
    }),
  ]);

  console.log('✅ Solution categories created:', categories.length);

  // Create sample solution
  const solution = await prisma.solution.create({
    data: {
      title: 'Cloud Infrastructure Management',
      slug: 'cloud-infrastructure-management',
      description: 'Comprehensive cloud management platform',
      longDescription: 'Manage your entire cloud infrastructure with ease...',
      categoryId: categories[0].id,
      features: [
        'Multi-cloud support',
        'Auto-scaling',
        'Cost optimization',
        'Security monitoring',
      ],
      benefits: [
        'Reduce costs by 40%',
        'Increase reliability',
        'Improve security posture',
      ],
      isPublished: true,
      publishedAt: new Date(),
      sortOrder: 1,
    },
  });

  console.log('✅ Sample solution created');

  // Create sample blog post
  const blogPost = await prisma.blogPost.create({
    data: {
      title: 'The Future of Cloud Computing',
      slug: 'future-of-cloud-computing',
      excerpt: 'Exploring emerging trends in cloud technology',
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Cloud computing is evolving rapidly...' }],
          },
        ],
      },
      authorId: superAdmin.id,
      tags: ['cloud', 'technology', 'innovation'],
      readingTime: 5,
      status: 'PUBLISHED',
      publishedAt: new Date(),
    },
  });

  console.log('✅ Sample blog post created');

  // Create sample team member
  const teamMember = await prisma.team.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      role: 'Chief Technology Officer',
      bio: 'Experienced technology leader with 15+ years in the industry',
      sortOrder: 1,
      isActive: true,
    },
  });

  console.log('✅ Sample team member created');

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📝 Default credentials:');
  console.log('   Email: admin@soothe.com');
  console.log('   Password: Admin@123');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
