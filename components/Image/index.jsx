// import styled from "styled-components";

// const Img = styled.img`
// width: 100%;
// `;

// const ImageWrapper = styled.div`
// overflow: hidden;
// `;

// export default function Image({ src, alt, width, height, borderRadius, ...other }) {
//     return <ImageWrapper {...other} style={{ width, height, borderRadius }}>
//         <img src={src} alt={alt} />
//     </ImageWrapper>
// }


// 只调用一次onError 防止默认图加载不出来导致死循环
import React, { useState } from 'react'
const Image = props => {
	const [isError, setIsError] = useState(true)
	const defaultImg = props.defaultImg || '/svg/default.svg'
	const imgerrorfun = (event) => {
		if (isError) {
			setIsError(false);
			event.target.src = defaultImg;
    }
	}
  return (
    <img onError={imgerrorfun} {...props} />
  )
}
export default Image;
