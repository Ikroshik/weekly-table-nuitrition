import React from "react"
import ContentLoader from "react-content-loader"

export const Skeleton = () => (
    <ContentLoader
        speed={2}
        width={500}
        height={144}
        viewBox="0 0 800 200"
        backgroundColor="#f3f3f3"
        foregroundColor="#a6e192"
    >
        <rect x="9" y="17" rx="15" ry="15" width="770" height="185" />

    </ContentLoader>
)


