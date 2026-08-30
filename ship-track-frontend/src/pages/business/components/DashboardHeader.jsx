const DashboardHeader = () => {
  return (
    <header className="flex h-24 items-center justify-between border-b border-gray-200 bg-white px-6">
      <h1 className="text-2xl font-bold text-gray-900">
        Dashboard
      </h1>

      <div className="flex items-center">
        <div className="mr-3 flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-xl">
          👤
        </div>

        <div className="hidden sm:block">
          <p className="text-sm font-bold text-gray-900">
            John Doe
          </p>

          <p className="text-xs text-gray-500">
            Business Client
          </p>
        </div>

        <span className="ml-3 text-gray-500">
          ⌄
        </span>
      </div>
    </header>
  );
};

export default DashboardHeader;