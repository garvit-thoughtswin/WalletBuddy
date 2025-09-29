function getNameInitials(name: string): string {
  const names = name.split(' ')
  const initials = names.map((n) => n.charAt(0).toUpperCase()).join('')
  return initials
}

function getFullName(token: string): string {
  const payload = JSON.parse(atob(token.split('.')[1]))
  return payload.name || '';
}

function getNameFromJWT(token: string): string | null {
  try {
    const name = getFullName(token);
    return getNameInitials(name);
  } catch (error) {
    console.error('Error parsing JWT:', error)
    return null
  }
}

export { getNameInitials, getNameFromJWT , getFullName }