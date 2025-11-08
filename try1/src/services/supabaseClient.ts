import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL ?? ''
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

// Placeholder: if env variables are not set, client will still be created but calls will fail until configured.
export const supabase = createClient(url, anonKey)

export const getUser = async () => {
  try {
    const res = await supabase.auth.getUser()
    // res may contain { data: { user } }
    // @ts-ignore
    return res?.data?.user ?? null
  } catch (e) {
    return null
  }
}

export default supabase
