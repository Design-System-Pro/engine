interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return <main className="w-full h-full flex justify-center">{children}</main>;
}
