

export default function className(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
