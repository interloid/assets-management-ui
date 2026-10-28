import interloidMark from "@/assets/interloid-mark.svg";

export default function BrandTitle() {
  return (
    <div className="flex gap-2.5 justify-center relative md:gap-[8.5px] md:top-px">
      <img src={interloidMark} alt="logo" className="w-8 relative bottom-px" />
      <div className="flex flex-col leading-4 relative bottom-px left-px">
        <span className="font-semibold text-[16px]">Interloid</span>
        <span className="text-muted-foreground text-[13px]">
          Asset Register
        </span>
      </div>
    </div>
  );
}
