import logoURL from '@src/assets/logo.jpg'
const MainView = () => {
  return (
    <div className="select-none flex-1 flex-col flex justify-center items-center">
      <div className="flex-col flex">
        <img src={logoURL} alt="logo" className="w-96" />
      </div>
    </div>
  )
}
export default MainView
