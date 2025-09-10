const Header = ({name}) => {
    return (
      <h1>{name}</h1>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>
          {props.part.name} {props.part.exercises}
        </p>
      </div>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        { parts.map(part => <Part key={part.id} part={part}/>) }
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce((s, p) => s + p.exercises, 0)
    return (
      <p> <b>total of {total} exercises</b></p>
    )
  }
  
const Course = (props) => {
    return (
      <div>
        <Header name={props.course.name}/>
        <Content parts={props.course.parts}/>
        <Total parts={props.course.parts}/>
      </div>
    )
}

export default Course;