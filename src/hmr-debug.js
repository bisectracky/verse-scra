// HMR Debug utility
if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', () => {
    console.log('🔄 HMR: About to update')
  })

  import.meta.hot.on('vite:afterUpdate', () => {
    console.log('✅ HMR: Update completed')
  })

  import.meta.hot.on('vite:error', (error) => {
    console.error('❌ HMR Error:', error)
  })
}

export const enableHMRDebug = () => {
  console.log('🔍 HMR Debug enabled')
}