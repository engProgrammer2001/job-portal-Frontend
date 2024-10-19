import React from "react";

const BookMark = () => {
  return (
    <div>
      <div className="p-6 bg-background text-foreground">
        <h1 className="text-2xl font-bold">My Bookmarks</h1>
        <nav className="mt-4">
          <a href="#" className="text-primary hover:underline">
            Home
          </a>{" "}
          &gt;
          <a href="#" className="text-primary hover:underline">
            Dashboard
          </a>
        </nav>

        <div className="mt-6 bg-card p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">
            <span className="text-accent">❤️</span> Bookmark
          </h2>
          <p className="text-muted-foreground">
            You currently have no bookmarks
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookMark;
