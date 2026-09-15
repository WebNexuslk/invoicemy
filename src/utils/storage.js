const STORAGE_KEY = 'invoice-maker-business'

export const loadBusinessInfo = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch (err) {
    console.error('Failed to load business info from localStorage:', err)
    return null
  }
}

export const saveBusinessInfo = (business) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(business))
  } catch (err) {
    console.error('Failed to save business info to localStorage:', err)
  }
}
