import BellIcon from "../icons/Bell";

function NavBar() {
  return (
    <>
      <nav className="h-20 flex w-full bg-slate-100 shadow-md text-slate-500 font-semibold">
        <div className=" grid  grid-cols-[150px_80px_1fr] items-center w-[calc(350px)] ml-auto">
          <div className="">
            <p>Administrador</p>
          </div>
          <div className="">
            <BellIcon/>
          </div>
          <div className="">
            <div className="w-16 h-16 rounded-full border">
              <img
                className="w-full h-full rounded-full"
                src="/steveJobs.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
