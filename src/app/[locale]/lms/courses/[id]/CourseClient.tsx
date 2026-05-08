"use client"

type Props = {
  id: string
}

export default function CourseClient({ id }: Props) {
  return (
    <div>
      Course ID: {id}
    </div>
  )
}