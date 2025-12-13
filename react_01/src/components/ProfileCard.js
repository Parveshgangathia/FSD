function ProfileCard() {
  return (
    <div className="max-w-sm mx-auto shadow-xl rounded-xl text-center p-6 hover:scale-105 transition">
      <img
        src="https://i.pravatar.cc/150?img=12"
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />

      <h2 className="text-xl font-bold">Parvesh Kumar</h2>
      <p className="text-blue-600 font-medium">Frontend Developer</p>

      <p className="text-gray-600 text-sm mt-2">
        Passionate about building clean UI and learning modern web technologies.
      </p>

      <button className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Follow
      </button>
    </div>
  );
}

export default ProfileCard;
