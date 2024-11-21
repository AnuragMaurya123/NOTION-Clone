import LiveblockProvider from "@/components/LiveBlockProvider"


export default function PageLayout({children}:{
     children : React.ReactNode
}) {
  return (
    <LiveblockProvider >
   {children}
    </LiveblockProvider>
  )
}

