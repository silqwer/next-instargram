import CloseIcon from "../icons/CloseIcon";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};
export default function PostModal({ onClose, children }: Props) {
  const modalClose = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <section
      className="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-full h-full bg-neutral-900/70"
      onClick={modalClose}
    >
      <button className="fixed top-0 right-0 text-white" onClick={onClose}>
        <CloseIcon />
      </button>
      <div className="w-4/5 bg-white h-3/5 max-w-7xl">{children}</div>
    </section>
  );
}
