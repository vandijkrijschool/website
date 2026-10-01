type DriveYouLogoProps = {
  className?: string;
  inverse?: boolean;
};

export default function DriveYouLogo({ className = "", inverse = false }: DriveYouLogoProps) {
  return (
    <img
      alt="DriveYOU"
      className={`driveyou-logo ${className}`.trim()}
      height="108"
      loading="lazy"
      src={inverse ? "/images/driveyou-logo-inverse.svg" : "/images/driveyou-logo.svg"}
      width="554"
    />
  );
}
