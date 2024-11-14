import Header from "../Header"

export default () => {
  return (
    <section className="h-full flex flex-col">
      <Header>
        <div className="flex-1 drag-area flex justify-center items-center"></div>
      </Header>
      
      <iframe
        className="w-full h-full flex-1"
        src="https://www.alemonjs.com"
        title="Embedded Site"
        sandbox="allow-same-origin allow-scripts allow-forms"
      />
    </section>
  )
}
