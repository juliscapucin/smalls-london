export default function BusinessModal() {
  return (
    <div>
      <div>
        <h2 className="heading-headline">Edit Business</h2>
        <form>
          <label className="block mb-2">
            Business Name
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
              defaultValue="Sample Business"
            />
          </label>
          <label className="block mb-4">
            Description
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
              defaultValue="This is a sample business description."
            />
          </label>
          <div className="flex justify-end space-x-4">
            <button type="button" className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
