export interface PageSection {
  id: string
  title: string
  content: React.ReactNode
  bg: string
}

export interface NavigationButton {
  id: string
  icon: React.ReactElement
  iconSmall: React.ReactElement
  label: string
  tooltip: string
  route: string
  activeBackground: string
  activeBorder: string
}