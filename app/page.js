import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center flex-col text-white h-[44vh] gap-4 ">
        <div className="font-bold text-5xl flex items-center">Buy Me a Chai
          <span><img width={60} src="/tea.gif" alt="" /></span>
        </div>
        <p>A crowdfunding platform for creators. Get funded by your fans and followers. Start now!</p>
        <div>

          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read more</button>
        </div>

      </div>
      <div className="bg-white h-1 opacity-10"></div>
      <div className="text-white container mx-auto py-16">
        <h2 className="text-2xl font-bold text-center my-7">Your Fans can buy you a Chai</h2>
        <div className="flex gap-5 justify-around ">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img width={70} src="/man.gif" alt="" className="item bg-slate-400 rounded-full p-2" />
            <p className="font-bold">Fund Yourself</p>
            <p className="text-center">Your fans are available to help you </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img width={70} src="/coin.gif" alt="" className="item bg-slate-400 rounded-full p-2" />
            <p className="font-bold">Fund Yourself</p>
            <p className="text-center">Your fans are available to help you </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img width={70} src="/group.gif" alt="" className="item bg-slate-400 rounded-full p-2" />
            <p className="font-bold">Fans want to help</p>
            <p className="text-center">Your fans are available to help you </p>
          </div>
        </div>
      </div>
      {/* <div className="bg-white h-1 opacity-10"></div>
      <div className="text-white container mx-auto py-16">
        <h2 className="text-2xl font-bold text-center my-7">Know more</h2>
        <div className="flex gap-5 justify-around ">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img width={70} src="/man.gif" alt="" className="item bg-slate-400 rounded-full p-2" />
            <p className="font-bold">Fund Yourself</p>
            <p className="text-center">Your fans are available to help you </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img width={70} src="/coin.gif" alt="" className="item bg-slate-400 rounded-full p-2" />
            <p className="font-bold">Fund Yourself</p>
            <p className="text-center">Your fans are available to help you </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img width={70} src="/group.gif" alt="" className="item bg-slate-400 rounded-full p-2" />
            <p className="font-bold">Fans want to help</p>
            <p className="text-center">Your fans are available to help you </p>
          </div>
        </div>
      </div> */}
    </>
  );
}
