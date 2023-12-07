import { IoCloseSharp } from "react-icons/io5";
import { UIIconButton } from "ui";

export function ImageCard({ image, remove }: { image: string; remove: any }) {
    return (
      <div
        className="relative rounded-lg h-full w-full min-w-[256px] bg-cover overflow-hidden group"
        style={{
          backgroundImage: `url('${image}')`,
        }}
      >
        <UIIconButton
          className="text-xl !absolute rounded-full bg-slate-800/70 hover:bg-slate-800/90 right-1 top-1 peer z-[1] active:block"
          onClick={remove}
        >
          <IoCloseSharp className="text-slate-100" />
        </UIIconButton>
        <div className="absolute w-full h-full hover:bg-slate-800/10 peer-hover:bg-slate-800/10" />
      </div>
    )
  }