import { createServerSupabaseClient } from '@/lib/supabase-server'

export default async function sitemap() {
  const baseUrl = 'https://gulfcoastproductionnetwork.com'
  const supabase = createServerSupabaseClient()

  // Get all pro profile IDs
  const { data: pros } = await supabase
    .from('profiles')
    .select('id, updated_at')
    .eq('account_type', 'pro')

  const proUrls = (pros || []).map((pro: any) => ({
    url: `${baseUrl}/profile/${pro.id}`,
    lastModified: new Date(pro.updated_at),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/browse`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/post-job`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/auth`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...proUrls,
  ]
}
