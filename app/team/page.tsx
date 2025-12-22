import { frontendApi } from '@/lib/frontend-api'
import Header from '@/components/Header'
import Image from 'next/image'

export const metadata = {
  title: 'Our Team | SOOTHE Technologies',
  description: 'Meet the people behind SOOTHE Technologies',
}

export const revalidate = 3600

export default async function TeamPage() {
  const team = await frontendApi.getTeam().catch(() => [])
  const teamArray = Array.isArray(team) ? team : []

  return (
    <>
      <Header />
      <div>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-neutral-50 via-primary-50 to-accent-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
                Meet Our{' '}
                <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                  Team
                </span>
              </h1>
              <p className="text-xl text-neutral-700 leading-relaxed">
                We're a diverse group of designers, engineers, researchers, and advocates 
                passionate about making technology accessible to everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {teamArray.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-neutral-600">
                  Team information coming soon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamArray.map((member: any) => (
                  <div
                    key={member.id}
                    className="group bg-white rounded-2xl border-2 border-neutral-200 hover:border-primary-400 transition-all hover:shadow-lg overflow-hidden"
                  >
                    {member.photo && (
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h3 className="font-display text-2xl font-bold text-neutral-900 mb-2">
                        {member.name}
                      </h3>
                      <p className="text-primary-600 font-semibold mb-3">
                        {member.role}
                      </p>
                      
                      {member.bio && (
                        <p className="text-neutral-700 leading-relaxed mb-4">
                          {member.bio}
                        </p>
                      )}
                      
                      {/* Social Links */}
                      {(member.linkedinUrl || member.twitterUrl || member.githubUrl) && (
                        <div className="flex gap-3 mt-4">
                          {member.linkedinUrl && (
                            <a
                              href={member.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 flex items-center justify-center rounded-lg bg-neutral-100 hover:bg-primary-100 text-neutral-600 hover:text-primary-600 transition-colors"
                              aria-label={`${member.name}'s LinkedIn`}
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                              </svg>
                            </a>
                          )}
                          
                          {member.twitterUrl && (
                            <a
                              href={member.twitterUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 flex items-center justify-center rounded-lg bg-neutral-100 hover:bg-primary-100 text-neutral-600 hover:text-primary-600 transition-colors"
                              aria-label={`${member.name}'s Twitter`}
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                              </svg>
                            </a>
                          )}
                          
                          {member.githubUrl && (
                            <a
                              href={member.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 flex items-center justify-center rounded-lg bg-neutral-100 hover:bg-primary-100 text-neutral-600 hover:text-primary-600 transition-colors"
                              aria-label={`${member.name}'s GitHub`}
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                            </a>
                          )}
                          
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              className="w-10 h-10 flex items-center justify-center rounded-lg bg-neutral-100 hover:bg-primary-100 text-neutral-600 hover:text-primary-600 transition-colors"
                              aria-label={`Email ${member.name}`}
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Join Our Team CTA */}
        <section className="py-20 bg-neutral-50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
              Want to Join Us?
            </h2>
            <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
              We're always looking for talented, passionate people who share our vision 
              of making technology accessible to everyone.
            </p>
            <a
              href="/careers"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all hover:scale-105"
            >
              View Open Positions
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </>
  )
}
