const MessageUnsupportedBrowser = () => (
  <div className="mx-auto text-center xl:w-3/4">
    <h1 tabIndex={0} className="text-2xl font-bold text-slate-200">
      Flags of Inequality
    </h1>

    <div
      className="flex p-4 mt-8 mb-4 text-sm text-left border border-solid rounded-lg text-slate-20 border-slate-200 "
      role="alert"
    >
      <svg
        aria-hidden="true"
        className="flex-shrink-0 inline w-5 h-5 mr-3"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium">
          We do not currently support your browser. To ensure a correct viewing
          experience, please use one of the following recommended browsers to
          explore the visualization.
        </span>
        <ul className="mt-1.5 ml-4 text-slate-200 list-disc list-inside">
          <li>Chrome</li>
          <li>Safari</li>
          <li>Mozilla Firefox</li>
        </ul>
      </div>
    </div>
  </div>
);

export default MessageUnsupportedBrowser;
