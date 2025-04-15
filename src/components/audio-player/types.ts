export interface AudioTrack {
  id: string | number
  title: string
  artist: string
  description?: string
  url: string
  album?: string
  genre?: string
  comments?: string
  moodTags?: string[]
  artwork?: string
  category?: string
  liked?: boolean
}
