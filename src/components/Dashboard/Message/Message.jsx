import React from "react";

const Message = () => {
  return (
    <div>
      <div className="p-6 bg-background text-foreground">
        <h1 className="text-2xl font-bold">Messages</h1>
        <nav className="mt-4">
          <a href="#" className="text-muted-foreground hover:text-muted">
            Home
          </a>
          <span className="mx-2">›</span>
          <a href="#" className="text-muted-foreground hover:text-muted">
            Dashboard
          </a>
        </nav>
        <div className="mt-6 p-4 border border-border rounded-lg bg-card">
          <h2 className="text-lg font-semibold">Inbox</h2>
          <p className="text-muted-foreground">
            You don't have any messages yet
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default Message;
