const Header = ({ name }) => <h1>{name}</h1>

const Total = (sum) => <p><strong>total of {sum.sum} exercises</strong></p>

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
            {parts.map(part => 
                <Part key={part.id} part={part} />
            )}   
        </>
    )
  }

const Course = ({course}) => {
    const name = course.name
    let total = course.parts.reduce(function(sum, order) {
         return sum + order.exercises
        }, 0)

  return (
    <>
    <Header name={name} />
    <Content parts={course.parts} />
    <Total sum={total} />
    </>
  )
}


export default Course