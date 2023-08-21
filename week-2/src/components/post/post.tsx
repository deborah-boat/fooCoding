import React from 'react'
import './post.css'

interface postProps{
    title:string,
    post:string,
    className:string;
}

export default function post(
    title,
    post,
    className;
):Props {
  return (
    <div>
        			<div className={className}>
				{posts.map((post, index) => (
					<div className='post' key={index}>
						<h3>{title}</h3>
						<p>{post}</p>
					</div>
				))}
			</div>
		</div>

    </div>
  )
}
