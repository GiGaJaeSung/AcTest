export enum ScienceDisciplineType {
  PHYSICS = 'PHYSICS',
  CHEMISTRY = 'CHEMISTRY',
  BIOLOGY = 'BIOLOGY',
  EARTH_SCIENCE = 'EARTH_SCIENCE',
  ASTRONOMY = 'ASTRONOMY',
  DEFAULT = 'DEFAULT'
}

export interface User {
  id: number
  nickName: string
  profileImage?: string
  userRole?: string
  role?: string
}

export interface Comment {
  id: number
  content: string
  user: User
  userNickName?: string
  commentType?: string
  createdAt: string
  updatedAt: string
  isAuthor?: boolean
}

export interface Question {
  id: number
  title: string
  content: string
  user: User
  scienceDiscipline: ScienceDisciplineType
  recommendCnt: number
  recommended?: boolean
  createdAt: string
  updatedAt: string
  tags?: string[]
  comments?: Comment[]
}

export interface CommentCreateRequest {
  content: string
  commentType?: string
}

export interface CommentUpdateRequest {
  content: string
} 