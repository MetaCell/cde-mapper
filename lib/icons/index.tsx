import {SVGProps} from "react";

export const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.0675 15.1829C16.1256 15.241 16.1717 15.3099 16.2031 15.3858C16.2345 15.4617 16.2507 15.543 16.2507 15.6251C16.2507 15.7072 16.2345 15.7885 16.2031 15.8644C16.1717 15.9403 16.1256 16.0092 16.0675 16.0673C16.0095 16.1254 15.9405 16.1714 15.8647 16.2028C15.7888 16.2343 15.7075 16.2505 15.6253 16.2505C15.5432 16.2505 15.4619 16.2343 15.386 16.2028C15.3102 16.1714 15.2412 16.1254 15.1832 16.0673L10.0003 10.8837L4.81753 16.0673C4.70026 16.1846 4.5412 16.2505 4.37535 16.2505C4.2095 16.2505 4.05044 16.1846 3.93316 16.0673C3.81588 15.95 3.75 15.791 3.75 15.6251C3.75 15.4593 3.81588 15.3002 3.93316 15.1829L9.11675 10.0001L3.93316 4.81729C3.81588 4.70002 3.75 4.54096 3.75 4.3751C3.75 4.20925 3.81588 4.05019 3.93316 3.93292C4.05044 3.81564 4.2095 3.74976 4.37535 3.74976C4.5412 3.74976 4.70026 3.81564 4.81753 3.93292L10.0003 9.11651L15.1832 3.93292C15.3004 3.81564 15.4595 3.74976 15.6253 3.74976C15.7912 3.74976 15.9503 3.81564 16.0675 3.93292C16.1848 4.05019 16.2507 4.20925 16.2507 4.3751C16.2507 4.54096 16.1848 4.70002 16.0675 4.81729L10.8839 10.0001L16.0675 15.1829Z" fill="#676C74" />
  </svg>
);

export const MapTriFold = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.8844 3.88212C17.8095 3.82378 17.7223 3.78326 17.6295 3.76364C17.5366 3.74401 17.4405 3.74579 17.3484 3.76884L12.5727 4.96259L7.77969 2.56571C7.64614 2.4991 7.49317 2.48248 7.34844 2.51884L2.34844 3.76884C2.21323 3.80264 2.09319 3.88066 2.00741 3.9905C1.92163 4.10035 1.87502 4.23572 1.875 4.37509V15.6251C1.87501 15.7201 1.89667 15.8138 1.93833 15.8991C1.97998 15.9845 2.04054 16.0592 2.1154 16.1176C2.19025 16.1761 2.27745 16.2167 2.37035 16.2364C2.46326 16.2561 2.55943 16.2544 2.65156 16.2313L7.42734 15.0376L12.2203 17.4345C12.3073 17.4774 12.403 17.4998 12.5 17.5001C12.5511 17.5001 12.602 17.4938 12.6516 17.4813L17.6516 16.2313C17.7868 16.1975 17.9068 16.1195 17.9926 16.0097C18.0784 15.8998 18.125 15.7645 18.125 15.6251V4.37509C18.125 4.28003 18.1034 4.18622 18.0617 4.10079C18.02 4.01537 17.9593 3.94058 17.8844 3.88212ZM8.125 4.13602L11.875 6.01102V15.8641L8.125 13.9891V4.13602ZM3.125 4.86337L6.875 3.92587V13.8868L3.125 14.8243V4.86337ZM16.875 15.1368L13.125 16.0743V6.11337L16.875 5.17587V15.1368Z" fill="#676C74"/>
  </svg>
)

export const ChevronRight: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.3535 8.35354L6.35354 13.3535C6.30708 13.4 6.25193 13.4368 6.19124 13.462C6.13054 13.4871 6.06549 13.5001 5.99979 13.5001C5.93409 13.5001 5.86904 13.4871 5.80834 13.462C5.74764 13.4368 5.69249 13.4 5.64604 13.3535C5.59958 13.3071 5.56273 13.2519 5.53759 13.1912C5.51245 13.1305 5.49951 13.0655 5.49951 12.9998C5.49951 12.9341 5.51245 12.869 5.53759 12.8083C5.56273 12.7476 5.59958 12.6925 5.64604 12.646L10.2929 7.99979L5.64604 3.35354C5.55222 3.25972 5.49951 3.13247 5.49951 2.99979C5.49951 2.86711 5.55222 2.73986 5.64604 2.64604C5.73986 2.55222 5.86711 2.49951 5.99979 2.49951C6.13247 2.49951 6.25972 2.55222 6.35354 2.64604L11.3535 7.64604C11.4 7.69248 11.4369 7.74762 11.4621 7.80832C11.4872 7.86902 11.5002 7.93408 11.5002 7.99979C11.5002 8.0655 11.4872 8.13056 11.4621 8.19126C11.4369 8.25196 11.4 8.3071 11.3535 8.35354Z" fill={props.color || "#676C74"}/>
  </svg>
)

export const ChevronDown: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.8335 7.91675L10.0002 12.0834L14.1668 7.91675H5.8335Z" fill="#676C74"/>
    </svg>
);

export const CheckboxDefault = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" fill="white"/>
    <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="#D6D8DB"/>
  </svg>
)

export const CheckboxSelected = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="15" height="15" rx="3.5" fill="#EEF2FC"/>
<rect x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="#19418F"/>
<path d="M6.39754 9.93746L4.31254 7.85246L3.60254 8.55746L6.39754 11.3525L12.3975 5.35246L11.6925 4.64746L6.39754 9.93746Z" fill="#19418F"/>
</svg>
)

export const GlobeIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={props.style}>
    <path d="M10 1.875C8.39303 1.875 6.82214 2.35152 5.486 3.24431C4.14985 4.1371 3.10844 5.40605 2.49348 6.8907C1.87852 8.37535 1.71762 10.009 2.03112 11.5851C2.34463 13.1612 3.11846 14.6089 4.25476 15.7452C5.39106 16.8815 6.8388 17.6554 8.4149 17.9689C9.99099 18.2824 11.6247 18.1215 13.1093 17.5065C14.594 16.8916 15.8629 15.8502 16.7557 14.514C17.6485 13.1779 18.125 11.607 18.125 10C18.1227 7.84581 17.266 5.78051 15.7427 4.25727C14.2195 2.73403 12.1542 1.87727 10 1.875ZM16.8461 9.375H13.7344C13.6242 7.15156 12.932 5.04141 11.7719 3.35938C13.1306 3.72417 14.3452 4.49613 15.2523 5.57152C16.1594 6.64691 16.7156 7.97419 16.8461 9.375ZM10 16.8664C8.53672 15.2828 7.64922 13.0383 7.51797 10.625H12.482C12.3508 13.0367 11.4633 15.2828 10 16.8664ZM7.51797 9.375C7.64922 6.96328 8.5336 4.71719 10 3.13359C11.4633 4.71719 12.3508 6.96172 12.482 9.375H7.51797ZM8.22813 3.35938C7.06797 5.04141 6.37578 7.15156 6.26563 9.375H3.15391C3.28444 7.97419 3.84063 6.64691 4.74773 5.57152C5.65483 4.49613 6.86937 3.72417 8.22813 3.35938ZM3.15391 10.625H6.26563C6.37578 12.8484 7.06797 14.9586 8.22813 16.6406C6.86937 16.2758 5.65483 15.5039 4.74773 14.4285C3.84063 13.3531 3.28444 12.0258 3.15391 10.625ZM11.7719 16.6406C12.932 14.9563 13.6242 12.8461 13.7344 10.625H16.8461C16.7156 12.0258 16.1594 13.3531 15.2523 14.4285C14.3452 15.5039 13.1306 16.2758 11.7719 16.6406Z" fill={props.color || "#2155BA"} />
</svg>
)

export const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.8538 8.35354L9.35375 12.8535C9.25993 12.9474 9.13268 13.0001 9 13.0001C8.86732 13.0001 8.74007 12.9474 8.64625 12.8535C8.55243 12.7597 8.49972 12.6325 8.49972 12.4998C8.49972 12.3671 8.55243 12.2399 8.64625 12.146L12.2931 8.49979H2.5C2.36739 8.49979 2.24021 8.44711 2.14645 8.35334C2.05268 8.25958 2 8.1324 2 7.99979C2 7.86718 2.05268 7.74 2.14645 7.64624C2.24021 7.55247 2.36739 7.49979 2.5 7.49979H12.2931L8.64625 3.85354C8.55243 3.75972 8.49972 3.63247 8.49972 3.49979C8.49972 3.36711 8.55243 3.23986 8.64625 3.14604C8.74007 3.05222 8.86732 2.99951 9 2.99951C9.13268 2.99951 9.25993 3.05222 9.35375 3.14604L13.8538 7.64604C13.9002 7.69248 13.9371 7.74762 13.9623 7.80832C13.9874 7.86902 14.0004 7.93408 14.0004 7.99979C14.0004 8.0655 13.9874 8.13056 13.9623 8.19126C13.9371 8.25196 13.9002 8.3071 13.8538 8.35354Z" fill="#676C74"/>
</svg>
)

export const RightIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.9126 13.825L10.7293 10L6.9126 6.175L8.0876 5L13.0876 10L8.0876 15L6.9126 13.825Z" fill={props.color || "#676C74"} />
  </svg>
)

export const LeftIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.0876 13.825L9.27093 10L13.0876 6.175L11.9126 5L6.9126 10L11.9126 15L13.0876 13.825Z" fill={props.color || "#676C74"}/>
  </svg>
)

export const LinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.4998 4V10.5C12.4998 10.6326 12.4471 10.7598 12.3533 10.8536C12.2596 10.9473 12.1324 11 11.9998 11C11.8672 11 11.74 10.9473 11.6462 10.8536C11.5525 10.7598 11.4998 10.6326 11.4998 10.5V5.20687L4.35354 12.3538C4.25972 12.4476 4.13247 12.5003 3.99979 12.5003C3.86711 12.5003 3.73986 12.4476 3.64604 12.3538C3.55222 12.2599 3.49951 12.1327 3.49951 12C3.49951 11.8673 3.55222 11.7401 3.64604 11.6462L10.7929 4.5H5.49979C5.36718 4.5 5.24 4.44732 5.14624 4.35355C5.05247 4.25979 4.99979 4.13261 4.99979 4C4.99979 3.86739 5.05247 3.74021 5.14624 3.64645C5.24 3.55268 5.36718 3.5 5.49979 3.5H11.9998C12.1324 3.5 12.2596 3.55268 12.3533 3.64645C12.4471 3.74021 12.4998 3.86739 12.4998 4Z" fill="#2155BA"/>
  </svg>
)

export const ArrowDropDown: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.9165 14.167L12.0832 10.0003L7.9165 5.83366L7.9165 14.167Z" fill={props.color || "#19418F"}/>
  </svg>
)

export const FilterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.5 6.25C2.5 6.08424 2.56585 5.92527 2.68306 5.80806C2.80027 5.69085 2.95924 5.625 3.125 5.625H5.625C5.79076 5.625 5.94973 5.69085 6.06694 5.80806C6.18415 5.92527 6.25 6.08424 6.25 6.25C6.25 6.41576 6.18415 6.57473 6.06694 6.69194C5.94973 6.80915 5.79076 6.875 5.625 6.875H3.125C2.95924 6.875 2.80027 6.80915 2.68306 6.69194C2.56585 6.57473 2.5 6.41576 2.5 6.25ZM16.875 13.125H13.75V11.875C13.75 11.7092 13.6842 11.5503 13.5669 11.4331C13.4497 11.3158 13.2908 11.25 13.125 11.25C12.9592 11.25 12.8003 11.3158 12.6831 11.4331C12.5658 11.5503 12.5 11.7092 12.5 11.875V15.625C12.5 15.7908 12.5658 15.9497 12.6831 16.0669C12.8003 16.1842 12.9592 16.25 13.125 16.25C13.2908 16.25 13.4497 16.1842 13.5669 16.0669C13.6842 15.9497 13.75 15.7908 13.75 15.625V14.375H16.875C17.0408 14.375 17.1997 14.3092 17.3169 14.1919C17.4342 14.0747 17.5 13.9158 17.5 13.75C17.5 13.5842 17.4342 13.4253 17.3169 13.3081C17.1997 13.1908 17.0408 13.125 16.875 13.125ZM10.625 13.125H3.125C2.95924 13.125 2.80027 13.1908 2.68306 13.3081C2.56585 13.4253 2.5 13.5842 2.5 13.75C2.5 13.9158 2.56585 14.0747 2.68306 14.1919C2.80027 14.3092 2.95924 14.375 3.125 14.375H10.625C10.7908 14.375 10.9497 14.3092 11.0669 14.1919C11.1842 14.0747 11.25 13.9158 11.25 13.75C11.25 13.5842 11.1842 13.4253 11.0669 13.3081C10.9497 13.1908 10.7908 13.125 10.625 13.125ZM8.125 8.75C8.29076 8.75 8.44973 8.68415 8.56694 8.56694C8.68415 8.44973 8.75 8.29076 8.75 8.125V6.875H16.875C17.0408 6.875 17.1997 6.80915 17.3169 6.69194C17.4342 6.57473 17.5 6.41576 17.5 6.25C17.5 6.08424 17.4342 5.92527 17.3169 5.80806C17.1997 5.69085 17.0408 5.625 16.875 5.625H8.75V4.375C8.75 4.20924 8.68415 4.05027 8.56694 3.93306C8.44973 3.81585 8.29076 3.75 8.125 3.75C7.95924 3.75 7.80027 3.81585 7.68306 3.93306C7.56585 4.05027 7.5 4.20924 7.5 4.375V8.125C7.5 8.29076 7.56585 8.44973 7.68306 8.56694C7.80027 8.68415 7.95924 8.75 8.125 8.75Z" fill="#676C74"/>
</svg>
)

export const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17.9424 17.058L14.0306 13.1471C15.1644 11.7859 15.7298 10.04 15.6091 8.27263C15.4884 6.50524 14.691 4.85241 13.3828 3.65797C12.0745 2.46353 10.3561 1.81944 8.5851 1.85969C6.81406 1.89994 5.12671 2.62143 3.87407 3.87407C2.62143 5.12671 1.89994 6.81406 1.85969 8.5851C1.81944 10.3561 2.46353 12.0745 3.65797 13.3828C4.85241 14.691 6.50524 15.4884 8.27263 15.6091C10.04 15.7298 11.7859 15.1644 13.1471 14.0306L17.058 17.9424C17.1161 18.0004 17.185 18.0465 17.2609 18.0779C17.3367 18.1094 17.4181 18.1255 17.5002 18.1255C17.5823 18.1255 17.6636 18.1094 17.7395 18.0779C17.8154 18.0465 17.8843 18.0004 17.9424 17.9424C18.0004 17.8843 18.0465 17.8154 18.0779 17.7395C18.1094 17.6636 18.1255 17.5823 18.1255 17.5002C18.1255 17.4181 18.1094 17.3367 18.0779 17.2609C18.0465 17.185 18.0004 17.1161 17.9424 17.058ZM3.12518 8.75018C3.12518 7.63766 3.45508 6.55012 4.07316 5.6251C4.69124 4.70007 5.56975 3.9791 6.59758 3.55336C7.62542 3.12761 8.75642 3.01622 9.84756 3.23326C10.9387 3.4503 11.941 3.98603 12.7277 4.7727C13.5143 5.55937 14.0501 6.56165 14.2671 7.6528C14.4841 8.74394 14.3727 9.87494 13.947 10.9028C13.5213 11.9306 12.8003 12.8091 11.8753 13.4272C10.9502 14.0453 9.8627 14.3752 8.75018 14.3752C7.25884 14.3735 5.82906 13.7804 4.77453 12.7258C3.72 11.6713 3.12683 10.2415 3.12518 8.75018Z" fill="#A9ACB2"/>
</svg>
)

export const MagnifyGlassIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5594 11.9403L9.82121 9.20269C10.6149 8.24988 11.0106 7.02777 10.9261 5.79059C10.8417 4.55342 10.2835 3.39644 9.36771 2.56033C8.45193 1.72423 7.24906 1.27336 6.00933 1.30154C4.7696 1.32971 3.58845 1.83476 2.7116 2.7116C1.83476 3.58845 1.32971 4.7696 1.30154 6.00933C1.27336 7.24906 1.72423 8.45193 2.56033 9.36771C3.39644 10.2835 4.55342 10.8417 5.79059 10.9261C7.02777 11.0106 8.24988 10.6149 9.20269 9.82121L11.9403 12.5594C11.981 12.6001 12.0293 12.6323 12.0824 12.6543C12.1355 12.6763 12.1924 12.6876 12.2499 12.6876C12.3074 12.6876 12.3643 12.6763 12.4174 12.6543C12.4705 12.6323 12.5188 12.6001 12.5594 12.5594C12.6001 12.5188 12.6323 12.4705 12.6543 12.4174C12.6763 12.3643 12.6876 12.3074 12.6876 12.2499C12.6876 12.1924 12.6763 12.1355 12.6543 12.0824C12.6323 12.0293 12.6001 11.981 12.5594 11.9403ZM2.18738 6.12488C2.18738 5.34612 2.41831 4.58484 2.85097 3.93732C3.28363 3.2898 3.89858 2.78513 4.61806 2.48711C5.33755 2.18908 6.12925 2.11111 6.89305 2.26304C7.65685 2.41497 8.35844 2.78998 8.90911 3.34065C9.45978 3.89132 9.83479 4.59291 9.98672 5.35671C10.1387 6.12051 10.0607 6.91221 9.76266 7.6317C9.46464 8.35118 8.95996 8.96613 8.31244 9.39879C7.66492 9.83145 6.90364 10.0624 6.12488 10.0624C5.08095 10.0612 4.0801 9.64601 3.34193 8.90784C2.60375 8.16966 2.18854 7.16882 2.18738 6.12488Z" fill="#676C74"/>
  </svg>
)

export const SortIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.35354 10.6462C7.40003 10.6926 7.43691 10.7477 7.46207 10.8084C7.48723 10.8691 7.50018 10.9342 7.50018 10.9999C7.50018 11.0656 7.48723 11.1307 7.46207 11.1914C7.43691 11.2521 7.40003 11.3072 7.35354 11.3537L5.35354 13.3537C5.3071 13.4001 5.25196 13.437 5.19126 13.4622C5.13056 13.4873 5.0655 13.5003 4.99979 13.5003C4.93408 13.5003 4.86902 13.4873 4.80832 13.4622C4.74762 13.437 4.69248 13.4001 4.64604 13.3537L2.64604 11.3537C2.59958 11.3072 2.56273 11.252 2.53759 11.1914C2.51245 11.1307 2.49951 11.0656 2.49951 10.9999C2.49951 10.9342 2.51245 10.8692 2.53759 10.8085C2.56273 10.7478 2.59958 10.6926 2.64604 10.6462C2.73986 10.5523 2.86711 10.4996 2.99979 10.4996C3.06549 10.4996 3.13054 10.5126 3.19124 10.5377C3.25193 10.5628 3.30708 10.5997 3.35354 10.6462L4.49979 11.793V2.99991C4.49979 2.8673 4.55247 2.74012 4.64624 2.64635C4.74 2.55258 4.86718 2.49991 4.99979 2.49991C5.1324 2.49991 5.25957 2.55258 5.35334 2.64635C5.44711 2.74012 5.49979 2.8673 5.49979 2.99991V11.793L6.64604 10.6462C6.69248 10.5997 6.74762 10.5628 6.80832 10.5376C6.86902 10.5125 6.93408 10.4995 6.99979 10.4995C7.0655 10.4995 7.13056 10.5125 7.19126 10.5376C7.25196 10.5628 7.3071 10.5997 7.35354 10.6462ZM13.3535 4.64615L11.3535 2.64616C11.3071 2.59967 11.252 2.56279 11.1913 2.53763C11.1306 2.51246 11.0655 2.49951 10.9998 2.49951C10.9341 2.49951 10.869 2.51246 10.8083 2.53763C10.7476 2.56279 10.6925 2.59967 10.646 2.64616L8.64604 4.64615C8.55222 4.73998 8.49951 4.86722 8.49951 4.99991C8.49951 5.13259 8.55222 5.25984 8.64604 5.35366C8.73986 5.44748 8.86711 5.50018 8.99979 5.50018C9.13247 5.50018 9.25972 5.44748 9.35354 5.35366L10.4998 4.20678V12.9999C10.4998 13.1325 10.5525 13.2597 10.6462 13.3535C10.74 13.4472 10.8672 13.4999 10.9998 13.4999C11.1324 13.4999 11.2596 13.4472 11.3533 13.3535C11.4471 13.2597 11.4998 13.1325 11.4998 12.9999V4.20678L12.646 5.35366C12.7399 5.44748 12.8671 5.50018 12.9998 5.50018C13.1325 5.50018 13.2597 5.44748 13.3535 5.35366C13.4474 5.25984 13.5001 5.13259 13.5001 4.99991C13.5001 4.86722 13.4474 4.73998 13.3535 4.64615Z" fill="#676C74"/>
</svg>
)

export const BulletIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="4" cy="4" r="3" fill={props.color || "#12B76A"} />
</svg>
)

export const PairIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.4149 2.58486C13.0708 2.2398 12.6126 2.03224 12.1263 2.00115C11.64 1.97006 11.1591 2.11758 10.7738 2.41601C10.3886 2.71445 10.1256 3.14325 10.0342 3.6219C9.94279 4.10054 10.0293 4.59609 10.2774 5.01548L5.01553 10.2774C4.63332 10.0527 4.18737 9.96107 3.74753 10.0169C3.30769 10.0728 2.8988 10.273 2.58491 10.5861C2.32049 10.8507 2.13557 11.1841 2.05113 11.5485C1.9667 11.9128 1.98614 12.2936 2.10725 12.6475C2.22836 13.0014 2.44628 13.3142 2.73627 13.5505C3.02625 13.7867 3.37668 13.9369 3.74775 13.984C4.11881 14.0311 4.49564 13.9732 4.83545 13.8169C5.17525 13.6605 5.4644 13.412 5.67006 13.0996C5.87572 12.7872 5.98965 12.4233 5.9989 12.0494C6.00815 11.6755 5.91236 11.3064 5.72241 10.9842L10.9843 5.72236C11.4037 5.97049 11.8992 6.05697 12.3779 5.96556C12.8565 5.87415 13.2853 5.61114 13.5837 5.22592C13.8822 4.84069 14.0297 4.35977 13.9986 3.87347C13.9675 3.38716 13.76 2.92894 13.4149 2.58486ZM4.70678 12.7099C4.51914 12.8975 4.26464 13.0029 3.99928 13.0029C3.73392 13.0029 3.47942 12.8975 3.29178 12.7099C3.10414 12.5222 2.99872 12.2677 2.99872 12.0024C2.99872 11.737 3.10414 11.4825 3.29178 11.2949C3.38464 11.202 3.49489 11.1283 3.61623 11.078C3.73757 11.0278 3.86763 11.0019 3.99897 11.0019C4.13031 11.0019 4.26036 11.0278 4.3817 11.078C4.50304 11.1283 4.61329 11.202 4.70616 11.2949C4.89344 11.4823 4.9987 11.7363 4.99882 12.0013C4.99893 12.2662 4.8939 12.5204 4.70678 12.708V12.7099ZM12.7068 4.70986C12.5669 4.84969 12.3887 4.94491 12.1948 4.98347C12.0008 5.02204 11.7997 5.00222 11.617 4.92653C11.4343 4.85083 11.2781 4.72266 11.1683 4.55822C11.0584 4.39377 10.9998 4.20044 10.9998 4.00267C10.9998 3.8049 11.0584 3.61157 11.1683 3.44712C11.2781 3.28268 11.4343 3.15451 11.617 3.07881C11.7997 3.00312 12.0008 2.9833 12.1948 3.02187C12.3887 3.06044 12.5669 3.15565 12.7068 3.29548C12.8934 3.48271 12.9983 3.7362 12.9985 4.00054C12.9987 4.26488 12.8943 4.51855 12.708 4.70611L12.7068 4.70986Z" fill="#4F5359"/>
  </svg>
)

export const InfoIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.33325 12.0002H8.66659V10.6668H7.33325V12.0002ZM7.99992 1.3335C4.31992 1.3335 1.33325 4.32016 1.33325 8.00016C1.33325 11.6802 4.31992 14.6668 7.99992 14.6668C11.6799 14.6668 14.6666 11.6802 14.6666 8.00016C14.6666 4.32016 11.6799 1.3335 7.99992 1.3335ZM7.99992 13.3335C5.05992 13.3335 2.66659 10.9402 2.66659 8.00016C2.66659 5.06016 5.05992 2.66683 7.99992 2.66683C10.9399 2.66683 13.3333 5.06016 13.3333 8.00016C13.3333 10.9402 10.9399 13.3335 7.99992 13.3335ZM7.99992 4.00016C6.52659 4.00016 5.33325 5.1935 5.33325 6.66683H6.66659C6.66659 5.9335 7.26659 5.3335 7.99992 5.3335C8.73325 5.3335 9.33325 5.9335 9.33325 6.66683C9.33325 8.00016 7.33325 7.8335 7.33325 10.0002H8.66659C8.66659 8.50016 10.6666 8.3335 10.6666 6.66683C10.6666 5.1935 9.47325 4.00016 7.99992 4.00016Z" fill="#A9ACB2"/>
  </svg>
)

export const CrossIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.8538 12.146C12.9002 12.1925 12.9371 12.2476 12.9622 12.3083C12.9874 12.369 13.0003 12.4341 13.0003 12.4998C13.0003 12.5655 12.9874 12.6305 12.9622 12.6912C12.9371 12.7519 12.9002 12.8071 12.8538 12.8535C12.8073 12.9 12.7522 12.9368 12.6915 12.962C12.6308 12.9871 12.5657 13.0001 12.5 13.0001C12.4343 13.0001 12.3693 12.9871 12.3086 12.962C12.2479 12.9368 12.1927 12.9 12.1463 12.8535L8.00003 8.70666L3.85378 12.8535C3.75996 12.9474 3.63272 13.0001 3.50003 13.0001C3.36735 13.0001 3.2401 12.9474 3.14628 12.8535C3.05246 12.7597 2.99976 12.6325 2.99976 12.4998C2.99976 12.3671 3.05246 12.2399 3.14628 12.146L7.29316 7.99979L3.14628 3.85354C3.05246 3.75972 2.99976 3.63247 2.99976 3.49979C2.99976 3.36711 3.05246 3.23986 3.14628 3.14604C3.2401 3.05222 3.36735 2.99951 3.50003 2.99951C3.63272 2.99951 3.75996 3.05222 3.85378 3.14604L8.00003 7.29291L12.1463 3.14604C12.2401 3.05222 12.3674 2.99951 12.5 2.99951C12.6327 2.99951 12.76 3.05222 12.8538 3.14604C12.9476 3.23986 13.0003 3.36711 13.0003 3.49979C13.0003 3.63247 12.9476 3.75972 12.8538 3.85354L8.70691 7.99979L12.8538 12.146Z" fill="#676C74"/>
  </svg>
)

export const CheckIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.3538 4.85354L6.35378 12.8535C6.30735 12.9 6.2522 12.9369 6.1915 12.9621C6.13081 12.9872 6.06574 13.0002 6.00003 13.0002C5.93433 13.0002 5.86926 12.9872 5.80856 12.9621C5.74786 12.9369 5.69272 12.9 5.64628 12.8535L2.14628 9.35354C2.05246 9.25972 1.99976 9.13247 1.99976 8.99979C1.99976 8.86711 2.05246 8.73986 2.14628 8.64604C2.2401 8.55222 2.36735 8.49951 2.50003 8.49951C2.63272 8.49951 2.75996 8.55222 2.85378 8.64604L6.00003 11.7929L13.6463 4.14604C13.7401 4.05222 13.8674 3.99951 14 3.99951C14.1327 3.99951 14.26 4.05222 14.3538 4.14604C14.4476 4.23986 14.5003 4.36711 14.5003 4.49979C14.5003 4.63247 14.4476 4.75972 14.3538 4.85354Z" fill={ props.color || "#676C74"} />
  </svg>
)

export const UncheckedItemIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16">
    <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" fill="white" />
    <rect
      x="0.5"
      y="0.5"
      width="15"
      height="15"
      rx="3.5"
      stroke="#D0D5DD"
      fill="none"
    />
  </svg>
);

export const CheckedItemIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16">
    <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" fill="#E2ECFB" />
    <path
      d="M12 5L6.5 10.5L4 8"
      stroke="#3779E1"
      strokeWidth="1.6666"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <rect
      x="0.5"
      y="0.5"
      width="15"
      height="15"
      rx="3.5"
      stroke="#3779E1"
      fill="none"
    />
  </svg>
);

export const AddIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.8332 10.8334H10.8332V15.8334H9.1665V10.8334H4.1665V9.16675H9.1665V4.16675H10.8332V9.16675H15.8332V10.8334Z" fill="#676C74"/>
</svg>
)

export const MagicWandIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.7501 5C3.7501 4.83424 3.81595 4.67527 3.93316 4.55806C4.05037 4.44085 4.20934 4.375 4.3751 4.375H5.6251V3.125C5.6251 2.95924 5.69095 2.80027 5.80816 2.68306C5.92537 2.56585 6.08434 2.5 6.2501 2.5C6.41586 2.5 6.57484 2.56585 6.69205 2.68306C6.80926 2.80027 6.8751 2.95924 6.8751 3.125V4.375H8.1251C8.29086 4.375 8.44984 4.44085 8.56705 4.55806C8.68426 4.67527 8.7501 4.83424 8.7501 5C8.7501 5.16576 8.68426 5.32473 8.56705 5.44194C8.44984 5.55915 8.29086 5.625 8.1251 5.625H6.8751V6.875C6.8751 7.04076 6.80926 7.19973 6.69205 7.31694C6.57484 7.43415 6.41586 7.5 6.2501 7.5C6.08434 7.5 5.92537 7.43415 5.80816 7.31694C5.69095 7.19973 5.6251 7.04076 5.6251 6.875V5.625H4.3751C4.20934 5.625 4.05037 5.55915 3.93316 5.44194C3.81595 5.32473 3.7501 5.16576 3.7501 5ZM14.3751 15H13.7501V14.375C13.7501 14.2092 13.6843 14.0503 13.567 13.9331C13.4498 13.8158 13.2909 13.75 13.1251 13.75C12.9593 13.75 12.8004 13.8158 12.6832 13.9331C12.566 14.0503 12.5001 14.2092 12.5001 14.375V15H11.8751C11.7093 15 11.5504 15.0658 11.4332 15.1831C11.316 15.3003 11.2501 15.4592 11.2501 15.625C11.2501 15.7908 11.316 15.9497 11.4332 16.0669C11.5504 16.1842 11.7093 16.25 11.8751 16.25H12.5001V16.875C12.5001 17.0408 12.566 17.1997 12.6832 17.3169C12.8004 17.4342 12.9593 17.5 13.1251 17.5C13.2909 17.5 13.4498 17.4342 13.567 17.3169C13.6843 17.1997 13.7501 17.0408 13.7501 16.875V16.25H14.3751C14.5409 16.25 14.6998 16.1842 14.817 16.0669C14.9343 15.9497 15.0001 15.7908 15.0001 15.625C15.0001 15.4592 14.9343 15.3003 14.817 15.1831C14.6998 15.0658 14.5409 15 14.3751 15ZM18.7501 11.25H17.5001V10C17.5001 9.83424 17.4343 9.67527 17.317 9.55806C17.1998 9.44085 17.0409 9.375 16.8751 9.375C16.7093 9.375 16.5504 9.44085 16.4332 9.55806C16.316 9.67527 16.2501 9.83424 16.2501 10V11.25H15.0001C14.8343 11.25 14.6754 11.3158 14.5582 11.4331C14.441 11.5503 14.3751 11.7092 14.3751 11.875C14.3751 12.0408 14.441 12.1997 14.5582 12.3169C14.6754 12.4342 14.8343 12.5 15.0001 12.5H16.2501V13.75C16.2501 13.9158 16.316 14.0747 16.4332 14.1919C16.5504 14.3092 16.7093 14.375 16.8751 14.375C17.0409 14.375 17.1998 14.3092 17.317 14.1919C17.4343 14.0747 17.5001 13.9158 17.5001 13.75V12.5H18.7501C18.9159 12.5 19.0748 12.4342 19.192 12.3169C19.3093 12.1997 19.3751 12.0408 19.3751 11.875C19.3751 11.7092 19.3093 11.5503 19.192 11.4331C19.0748 11.3158 18.9159 11.25 18.7501 11.25ZM17.1337 6.25L6.2501 17.1336C6.01571 17.3678 5.69789 17.4994 5.36651 17.4994C5.03513 17.4994 4.71731 17.3678 4.48292 17.1336L2.86573 15.518C2.74963 15.4019 2.65753 15.2641 2.59469 15.1124C2.53185 14.9607 2.49951 14.7982 2.49951 14.634C2.49951 14.4698 2.53185 14.3072 2.59469 14.1556C2.65753 14.0039 2.74963 13.8661 2.86573 13.75L13.7501 2.86641C13.8662 2.7503 14.004 2.6582 14.1557 2.59537C14.3073 2.53253 14.4699 2.50019 14.6341 2.50019C14.7983 2.50019 14.9608 2.53253 15.1125 2.59537C15.2642 2.6582 15.402 2.7503 15.5181 2.86641L17.1337 4.48203C17.2498 4.59811 17.3419 4.73592 17.4047 4.8876C17.4676 5.03927 17.4999 5.20184 17.4999 5.36602C17.4999 5.53019 17.4676 5.69276 17.4047 5.84444C17.3419 5.99611 17.2498 6.13392 17.1337 6.25ZM12.8657 8.75L11.2501 7.13359L3.7501 14.6336L5.36573 16.25L12.8657 8.75ZM16.2501 5.36641L14.6337 3.75L12.1337 6.25L13.7501 7.86641L16.2501 5.36641Z" fill="#19418F"/>
</svg>
)

export const DownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.6848 5.55953L7.30977 9.93453C7.26914 9.97521 7.22089 10.0075 7.16778 10.0295C7.11467 10.0515 7.05774 10.0628 7.00024 10.0628C6.94275 10.0628 6.88582 10.0515 6.83271 10.0295C6.7796 10.0075 6.73134 9.97521 6.69071 9.93453L2.31571 5.55953C2.23362 5.47744 2.1875 5.3661 2.1875 5.25C2.1875 5.1339 2.23362 5.02256 2.31571 4.94047C2.3978 4.85837 2.50915 4.81226 2.62524 4.81226C2.74134 4.81226 2.85268 4.85837 2.93477 4.94047L7.00024 9.00648L11.0657 4.94047C11.1064 4.89982 11.1546 4.86758 11.2077 4.84558C11.2608 4.82358 11.3178 4.81226 11.3752 4.81226C11.4327 4.81226 11.4897 4.82358 11.5428 4.84558C11.5959 4.86758 11.6441 4.89982 11.6848 4.94047C11.7254 4.98112 11.7577 5.02937 11.7797 5.08248C11.8017 5.13559 11.813 5.19251 11.813 5.25C11.813 5.30748 11.8017 5.36441 11.7797 5.41752C11.7577 5.47063 11.7254 5.51888 11.6848 5.55953Z" fill="#676C74"/>
</svg>
)

export const TargetIcon = () => (
  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.6428 7.5H14.1216C14.0016 6.08715 13.3858 4.76225 12.3832 3.75962C11.3806 2.75699 10.0557 2.14123 8.64282 2.02125V1.5C8.64282 1.36739 8.59014 1.24021 8.49638 1.14645C8.40261 1.05268 8.27543 1 8.14282 1C8.01021 1 7.88304 1.05268 7.78927 1.14645C7.6955 1.24021 7.64282 1.36739 7.64282 1.5V2.02125C6.22997 2.14123 4.90507 2.75699 3.90244 3.75962C2.89981 4.76225 2.28406 6.08715 2.16407 7.5H1.64282C1.51021 7.5 1.38304 7.55268 1.28927 7.64645C1.1955 7.74021 1.14282 7.86739 1.14282 8C1.14282 8.13261 1.1955 8.25979 1.28927 8.35355C1.38304 8.44732 1.51021 8.5 1.64282 8.5H2.16407C2.28406 9.91285 2.89981 11.2377 3.90244 12.2404C4.90507 13.243 6.22997 13.8588 7.64282 13.9788V14.5C7.64282 14.6326 7.6955 14.7598 7.78927 14.8536C7.88304 14.9473 8.01021 15 8.14282 15C8.27543 15 8.40261 14.9473 8.49638 14.8536C8.59014 14.7598 8.64282 14.6326 8.64282 14.5V13.9788C10.0557 13.8588 11.3806 13.243 12.3832 12.2404C13.3858 11.2377 14.0016 9.91285 14.1216 8.5H14.6428C14.7754 8.5 14.9026 8.44732 14.9964 8.35355C15.0901 8.25979 15.1428 8.13261 15.1428 8C15.1428 7.86739 15.0901 7.74021 14.9964 7.64645C14.9026 7.55268 14.7754 7.5 14.6428 7.5ZM8.64282 12.975V12.5C8.64282 12.3674 8.59014 12.2402 8.49638 12.1464C8.40261 12.0527 8.27543 12 8.14282 12C8.01021 12 7.88304 12.0527 7.78927 12.1464C7.6955 12.2402 7.64282 12.3674 7.64282 12.5V12.975C6.49587 12.858 5.42439 12.3489 4.60916 11.5337C3.79393 10.7184 3.28485 9.64695 3.16782 8.5H3.64282C3.77543 8.5 3.90261 8.44732 3.99638 8.35355C4.09014 8.25979 4.14282 8.13261 4.14282 8C4.14282 7.86739 4.09014 7.74021 3.99638 7.64645C3.90261 7.55268 3.77543 7.5 3.64282 7.5H3.16782C3.28485 6.35305 3.79393 5.28157 4.60916 4.46634C5.42439 3.65111 6.49587 3.14203 7.64282 3.025V3.5C7.64282 3.63261 7.6955 3.75979 7.78927 3.85355C7.88304 3.94732 8.01021 4 8.14282 4C8.27543 4 8.40261 3.94732 8.49638 3.85355C8.59014 3.75979 8.64282 3.63261 8.64282 3.5V3.025C9.78978 3.14203 10.8613 3.65111 11.6765 4.46634C12.4917 5.28157 13.0008 6.35305 13.1178 7.5H12.6428C12.5102 7.5 12.383 7.55268 12.2893 7.64645C12.1955 7.74021 12.1428 7.86739 12.1428 8C12.1428 8.13261 12.1955 8.25979 12.2893 8.35355C12.383 8.44732 12.5102 8.5 12.6428 8.5H13.1178C13.0008 9.64695 12.4917 10.7184 11.6765 11.5337C10.8613 12.3489 9.78978 12.858 8.64282 12.975ZM8.14282 5.5C7.64837 5.5 7.16502 5.64662 6.7539 5.92133C6.34277 6.19603 6.02234 6.58648 5.83312 7.04329C5.6439 7.50011 5.5944 8.00277 5.69086 8.48773C5.78732 8.97268 6.02542 9.41814 6.37506 9.76777C6.72469 10.1174 7.17014 10.3555 7.6551 10.452C8.14005 10.5484 8.64272 10.4989 9.09953 10.3097C9.55635 10.1205 9.94679 9.80005 10.2215 9.38893C10.4962 8.9778 10.6428 8.49445 10.6428 8C10.6428 7.33696 10.3794 6.70107 9.91059 6.23223C9.44175 5.76339 8.80586 5.5 8.14282 5.5ZM8.14282 9.5C7.84615 9.5 7.55614 9.41203 7.30947 9.2472C7.06279 9.08238 6.87053 8.84811 6.757 8.57403C6.64347 8.29994 6.61377 7.99834 6.67164 7.70736C6.72952 7.41639 6.87238 7.14912 7.08216 6.93934C7.29194 6.72956 7.55922 6.5867 7.85019 6.52882C8.14116 6.47094 8.44276 6.50065 8.71685 6.61418C8.99094 6.72771 9.2252 6.91997 9.39003 7.16664C9.55485 7.41332 9.64282 7.70333 9.64282 8C9.64282 8.39782 9.48479 8.77936 9.20348 9.06066C8.92218 9.34196 8.54065 9.5 8.14282 9.5Z" fill="#4F5359"/>
  </svg>
)

export const NavigateNext = ({...props}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
    <path d="M11.3535 8.35378L6.35354 13.3538C6.30708 13.4002 6.25193 13.4371 6.19124 13.4622C6.13054 13.4874 6.06549 13.5003 5.99979 13.5003C5.93409 13.5003 5.86904 13.4874 5.80834 13.4622C5.74764 13.4371 5.69249 13.4002 5.64604 13.3538C5.59958 13.3073 5.56273 13.2522 5.53759 13.1915C5.51245 13.1308 5.49951 13.0657 5.49951 13C5.49951 12.9343 5.51245 12.8693 5.53759 12.8086C5.56273 12.7479 5.59958 12.6927 5.64604 12.6463L10.2929 8.00003L5.64604 3.35378C5.55222 3.25996 5.49951 3.13272 5.49951 3.00003C5.49951 2.86735 5.55222 2.7401 5.64604 2.64628C5.73986 2.55246 5.86711 2.49976 5.99979 2.49976C6.13247 2.49976 6.25972 2.55246 6.35354 2.64628L11.3535 7.64628C11.4 7.69272 11.4369 7.74786 11.4621 7.80856C11.4872 7.86926 11.5002 7.93433 11.5002 8.00003C11.5002 8.06574 11.4872 8.13081 11.4621 8.1915C11.4369 8.2522 11.4 8.30735 11.3535 8.35378Z" fill="#676C74"/>
  </svg>
)

export const CircleChipDefault = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
    <circle cx="4" cy="4" r="3" fill="#676C74"/>
  </svg>
)

export const CircleChipSuccess = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
    <circle cx="4" cy="4" r="3" fill="#12B76A"/>
  </svg>
)

export const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M17.5 10C17.5 10.1658 17.4342 10.3247 17.3169 10.4419C17.1997 10.5592 17.0408 10.625 16.875 10.625H10.625V16.875C10.625 17.0408 10.5592 17.1997 10.4419 17.3169C10.3247 17.4342 10.1658 17.5 10 17.5C9.83424 17.5 9.67527 17.4342 9.55806 17.3169C9.44085 17.1997 9.375 17.0408 9.375 16.875V10.625H3.125C2.95924 10.625 2.80027 10.5592 2.68306 10.4419C2.56585 10.3247 2.5 10.1658 2.5 10C2.5 9.83424 2.56585 9.67527 2.68306 9.55806C2.80027 9.44085 2.95924 9.375 3.125 9.375H9.375V3.125C9.375 2.95924 9.44085 2.80027 9.55806 2.68306C9.67527 2.56585 9.83424 2.5 10 2.5C10.1658 2.5 10.3247 2.56585 10.4419 2.68306C10.5592 2.80027 10.625 2.95924 10.625 3.125V9.375H16.875C17.0408 9.375 17.1997 9.44085 17.3169 9.55806C17.4342 9.67527 17.5 9.83424 17.5 10Z" fill="#676C74"/>
  </svg>
)

export const RadioSelected = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" fill="#EEF2FC"/>
    <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="#19418F"/>
    <circle cx="8" cy="8" r="3" fill="#19418F"/>
  </svg>
)