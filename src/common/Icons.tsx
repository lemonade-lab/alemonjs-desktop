export const Pause = (props?: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 3.25C5.75736 3.25 4.75 4.25736 4.75 5.5V18.4999C4.75 19.7426 5.75736 20.75 7 20.75H8.75C9.99264 20.75 11 19.7426 11 18.4999V5.5C11 4.25736 9.99264 3.25 8.75 3.25H7ZM6.25 5.5C6.25 5.08579 6.58579 4.75 7 4.75H8.75C9.16421 4.75 9.5 5.08579 9.5 5.5V18.4999C9.5 18.9142 9.16421 19.2499 8.75 19.2499H7C6.58579 19.2499 6.25 18.9142 6.25 18.4999V5.5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.25 3.25C15.0074 3.25 14 4.25736 14 5.5V18.4999C14 19.7426 15.0074 20.75 16.25 20.75H18C19.2426 20.75 20.25 19.7426 20.25 18.4999V5.5C20.25 4.25736 19.2426 3.25 18 3.25H16.25ZM15.5 5.5C15.5 5.08579 15.8358 4.75 16.25 4.75H18C18.4142 4.75 18.75 5.08579 18.75 5.5V18.4999C18.75 18.9142 18.4142 19.2499 18 19.2499H16.25C15.8358 19.2499 15.5 18.9142 15.5 18.4999V5.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const Play = (props: React.SVGProps<SVGSVGElement> = {}) => {
  return (
    <svg viewBox="0 0 25 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.4357 13.9174C20.8659 13.0392 20.8659 10.9608 19.4357 10.0826L9.55234 4.01389C8.05317 3.09335 6.125 4.17205 6.125 5.93128L6.125 18.0688C6.125 19.828 8.05317 20.9067 9.55234 19.9861L19.4357 13.9174ZM18.6508 11.3609C19.1276 11.6536 19.1276 12.3464 18.6508 12.6391L8.76745 18.7079C8.26772 19.0147 7.625 18.6552 7.625 18.0688L7.625 5.93128C7.625 5.34487 8.26772 4.9853 8.76745 5.29215L18.6508 11.3609Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const Minimize = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      {...props}
    >
      <path
        d="M153.6 473.6h716.8a38.4 38.4 0 0 1 0 76.8H153.6a38.4 38.4 0 0 1 0-76.8z"
        fill="currentColor"
      ></path>
    </svg>
  )
}

export const Maximize = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      {...props}
    >
      <path
        d="M193.4848 819.2C171.3664 819.2 153.6 789.9136 153.6 768V409.6a61.952 61.952 0 0 1 51.2-51.2h460.8a61.952 61.952 0 0 1 51.2 51.2v358.4a60.16 60.16 0 0 1-49.5616 51.2z m11.264-51.2h460.8V409.6h-460.8z m563.2 1.8432V307.2H236.7488c-18.688 0-30.3616-6.8096-30.3616-25.6s11.6736-25.6 30.3616-25.6h531.2a62.1568 62.1568 0 0 1 51.2 51.2v462.6432c0 18.7904-7.0144 30.208-25.6 30.208S768 788.48 768 769.8432z"
        fill="currentColor"
      ></path>
    </svg>
  )
}

export const Close = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className="shrink-0 size-4"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18"></path>
      <path d="m6 6 12 12"></path>
    </svg>
  )
}
