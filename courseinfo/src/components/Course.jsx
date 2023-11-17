const Header = ({ name }) => <h1>{name}</h1>

const Total = (sum) => <p>Number of exercises {sum.sum}</p>

const Part = ({part}) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
        )
}

const Content = ({parts}) => {

    return (
    <>
        <Part
        part={parts[0]} 
        />
        <Part
        part={parts[1]} 
        />
        <Part
        part={parts[2]} 
        />      
    </>
    )
  }

const Course = ({course}) => {
    const name = course.name
    let sum = 0
    course.parts.map(part => sum += part.exercises)
    
  return (
    <>
    <Header name={name} />
    <Content parts={course.parts} />
    <Total sum={sum} />
    </>
  )
}


export default Course