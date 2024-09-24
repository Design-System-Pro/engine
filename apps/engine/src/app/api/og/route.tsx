import { getMetadata } from '@/lib/metadata';
import { ImageResponse } from 'next/og';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          backgroundColor: 'white',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width="150"
            height="150"
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="512" height="512" fill="white" />
            <path
              d="M375.251 171.237C386.096 174.934 396.694 179.617 407.045 185.285L427.379 144.249C416.534 137.101 404.211 130.939 390.409 125.764C376.853 120.588 359.108 118 337.172 118C320.412 118.739 305.624 122.56 292.808 129.461C286.457 132.758 280.802 136.661 275.843 141.169C281.484 145.748 287.06 150.975 291.684 156.38C298.834 164.58 304.928 173.343 309.95 182.658C311.594 178.625 314.26 175.311 317.948 172.716C324.602 168.033 333.722 165.691 345.306 165.691C354.671 165.691 364.653 167.54 375.251 171.237Z"
              fill="black"
            />
            <path
              d="M308.063 195.97C308.31 198.92 309.101 201.735 310.438 204.413C307.884 200.883 305.625 197.197 303.456 193.659C301.656 190.722 299.919 187.887 298.127 185.328C295.39 181.418 289.724 173.361 286.669 169.287L286.573 169.34C285.24 167.659 283.861 166.002 282.435 164.368C278.289 159.517 272.774 154.315 267.555 150.082C265.875 152.226 264.31 154.472 262.863 156.818C255.962 168.402 252.511 182.081 252.511 197.855C252.511 210.918 254.852 222.009 259.535 231.128C264.465 240.001 270.749 247.518 278.39 253.68C286.277 259.595 294.657 264.647 303.529 268.837C312.402 273.027 321.029 276.724 329.408 279.928C336.556 282.639 343.087 285.844 349.003 289.541C355.164 293.238 359.97 297.304 363.421 301.741C367.118 306.177 368.966 311.106 368.966 316.529C368.966 324.415 366.748 330.577 362.312 335.014C358.122 339.45 352.7 342.654 346.045 344.626C339.637 346.351 333.229 347.214 326.821 347.214C320.412 347.214 313.388 346.228 305.748 344.256C304.947 344.05 304.147 343.835 303.347 343.612C297.833 351.408 291.135 359.081 284.062 365.599L284.014 365.643L283.965 365.687C277.947 371.115 271.523 375.993 264.702 380.323C265.932 380.886 267.168 381.434 268.408 381.965C278.76 386.155 289.234 389.359 299.833 391.578C310.677 393.549 321.275 394.535 331.627 394.535C351.837 394.535 368.843 390.961 382.645 383.814C396.447 376.42 406.922 366.808 414.07 354.977C421.217 343.147 424.791 330.331 424.791 316.529C424.791 303.466 422.942 292.498 419.245 283.625C415.548 274.506 410.619 266.989 404.457 261.074C398.296 254.912 391.272 249.859 383.385 245.916C375.744 241.726 367.98 238.152 360.094 235.195C351.467 231.991 343.087 228.417 334.954 224.473C327.067 220.53 320.536 216.094 315.36 211.164C310.996 206.582 308.564 201.517 308.063 195.97Z"
              fill="black"
            />
            <path
              d="M251.869 373.755C260.505 368.915 268.475 363.2 275.78 356.612C281.238 351.582 286.582 345.456 291.042 339.548C288.304 338.501 285.565 337.359 282.826 336.123C275.432 332.426 268.531 328.236 262.123 323.553L238.462 365.329C242.854 368.369 247.323 371.178 251.869 373.755Z"
              fill="black"
            />
            <path
              d="M85 119.48V391.579H179.643C198.128 391.579 215.627 388.622 232.14 382.706C248.654 376.545 263.195 367.795 275.765 356.458C288.335 344.874 298.193 331.072 305.341 315.051C309.323 306.29 312.233 296.956 314.071 287.05C308.896 284.871 303.647 282.524 298.325 280.011C288.702 275.467 279.615 269.987 271.071 263.579L270.899 263.451L270.732 263.316C267.228 260.49 263.974 257.422 260.97 254.119C260.885 249.126 260.557 244.406 259.986 239.96C260.646 245.148 260.977 250.708 260.977 256.639C260.977 270.195 258.759 282.271 254.322 292.869C250.132 303.221 243.971 311.847 235.837 318.748C227.95 325.65 218.462 330.949 207.371 334.646C196.28 338.096 183.956 339.821 170.401 339.821H138.606V170.869H182.231C188.393 170.869 195.91 172.101 204.783 174.566C213.655 176.784 222.282 180.974 230.662 187.135C239.288 193.297 246.435 202.047 252.104 213.384C254.071 217.072 255.711 221.127 257.024 225.551C257.772 227.529 258.614 229.429 259.549 231.251C264.478 240.123 270.763 247.641 278.404 253.802C286.291 259.717 294.671 264.77 303.543 268.96C307.682 270.914 311.766 272.761 315.797 274.501C316.22 269.892 316.432 265.17 316.432 260.336C316.432 243.33 313.721 226.447 308.298 209.687C302.876 192.927 294.25 177.77 282.419 164.214C270.836 150.658 255.431 139.814 236.207 131.681C216.983 123.547 193.692 119.48 166.334 119.48H85Z"
              fill="black"
            />
          </svg>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 40,
            fontStyle: 'normal',
            color: 'black',
            marginTop: 30,
            lineHeight: 1.8,
            whiteSpace: 'pre-wrap',
          }}
        >
          <b>{getMetadata().description}</b>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}