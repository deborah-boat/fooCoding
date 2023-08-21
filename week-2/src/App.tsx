import { useState } from 'react';
import './styles/App.css';
import {Form}  from './components/Form/Form.component';
import {HeadLine} from './components/Headline/Headline.component';
import {Post} from './components/Post/Post.component';

function App() {
	const [posts, setPosts] = useState<any>([
		{ title: 'Hello World', body: 'This is my first post' },
		{ title: 'Pizza is great', body: 'I love pizza' },
		{ title: 'Coding is fun', body: 'I enjoy coding' },
		{ title: 'TypeScript is awesome but', body: 'is slowly killing me 💀' }
	])

	function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const element = event.target as HTMLFormElement

		const formData = new FormData(element)

		const newTitle = formData.get('title') as string
		const newBody = formData.get('body') as string

		const newPost = { title: newTitle, body: newBody }

		setPosts([...posts, newPost])

		element.reset()
	}

	return (
		    <div className="wrapper">
      <h1 className="headline" headline="Create New Post" />
      <Form
        formName="form"
        inputName="title"
        inputType="Text"
        textAreaName="post"
        titlePlaceholder="Title here"
        textAreaPlaceholder="Write your post here"
        buttonClassName="btn"
        buttonName="Post"
        handleFormSubmit={onSubmit}
      />
      
    </div>
  );
}

	

export default App;