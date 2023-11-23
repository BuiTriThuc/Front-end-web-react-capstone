import React from 'react'
import CreatePropertyType from './CreatePropertyType'
import requireAuth from '@/app/libs/requireAuth'

export default function CreatePropertyTypePage() {
  return requireAuth(<CreatePropertyType />, [3])
}
