/**
 * Get greeting based on current time of day
 * @param name - User's first name (optional)
 * @returns Greeting string with morning, afternoon, or evening message
 */
export function getTimeBasedGreeting(name?: string): string {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const displayName = name?.split(' ')[0] || 'there'
  return `${greeting}, ${displayName}`
}

/**
 * Get emoji based on current time of day
 * @returns Emoji representing the time of day
 */
export function getTimeEmoji(): string {
  const hour = new Date().getHours()

  if (hour < 5) {
    return '🌙'
  } else if (hour < 12) {
    return '🌅'
  } else if (hour < 17) {
    return '☀️'
  } else if (hour < 21) {
    return '🌆'
  } else {
    return '🌙'
  }
}
