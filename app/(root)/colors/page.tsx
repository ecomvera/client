import React from "react";

const colors = () => {
  return (
    <div className="grid grid-cols-3 gap-5 p-10">
      <div className="h-20 w-52 bg-border">border</div>
      <div className="h-20 w-52 bg-input">input</div>
      <div className="h-20 w-52 bg-ring text-background">ring</div>
      <div className="h-20 w-52 bg-backgound">background</div>
      <div className="h-20 w-52 bg-foreground text-background">foreground</div>
      <div className="h-20 w-52 bg-primary text-primary-foreground">primary</div>
      <div className="h-20 w-52 bg-primary-foreground">primary-foreground</div>
      <div className="h-20 w-52 bg-secondary">secondary</div>
      <div className="h-20 w-52 bg-secondary-foreground text-secondary">secondary-foreground</div>
      <div className="h-20 w-52 bg-destructive text-foreground">destructive</div>
      <div className="h-20 w-52 bg-destructive-foreground">destructive-foreground</div>
      <div className="h-20 w-52 bg-muted">muted</div>
      <div className="h-20 w-52 bg-muted-foreground">muted-foreground</div>
      <div className="h-20 w-52 bg-accent">accent</div>
      <div className="h-20 w-52 bg-accent-foreground text-accent">accent-foreground</div>
      <div className="h-20 w-52 bg-popover">popover</div>
      <div className="h-20 w-52 bg-popover-foreground text-popover">popover-foreground</div>
      <div className="h-20 w-52 bg-card">card</div>
      <div className="h-20 w-52 bg-card-foreground text-card">card-foreground</div>
    </div>
  );
};

export default colors;
