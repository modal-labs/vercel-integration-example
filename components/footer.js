export default function Footer() {
  return (
    <div
      className="w-full py-5 mx-auto fixed bottom-0 content-center flex justify-center"
      style={{
        color: "white",
        textAlign: "center",
        zIndex: 100,
      }}
    >
      <a href="https://modal.com" target="_blank" rel="noopener noreferrer">
        <footer className="flex flex-row items-center w-42 p-1 bg-zinc-800 mb-6 rounded shadow-lg">
          <span className="p-1 text-md">
            <strong>built with</strong>
          </span>
          <img className="h-12 w-24" src="/modal-logo.svg"></img>
        </footer>
      </a>
    </div>
  );
}
