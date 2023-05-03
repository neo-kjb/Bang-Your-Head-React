function ReviweListItem() {
  return (
    <li className="mb-2">
      <div className="flex items-center mb-1">
        <strong className="mr-2">John Doe:</strong>
        <div className="flex">
          <span className="text-yellow-500">&#9733;</span>
          <span className="text-yellow-500">&#9733;</span>
          <span className="text-yellow-500">&#9733;</span>
          <span className="text-yellow-500">&#9733;</span>
          <span className="text-gray-400">&#9733;</span>
        </div>
      </div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </li>
  );
}

export default ReviweListItem;
