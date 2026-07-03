'use client'

import { AppProvider, useApp } from '@/lib/AppContext'
import ScreenRenderer from '@/components/ScreenRenderer'

function PageContent() {
  return <ScreenRenderer />
}

export default function Page() {
  return (
    <AppProvider>
      <PageContent />
    </AppProvider>
  )
}
