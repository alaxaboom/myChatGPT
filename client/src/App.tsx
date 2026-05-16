import ChatContainer from './components/ChatContainer'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <ChatContainer />
      <Toaster position="top-center" />
    </>
  )
}

export default App