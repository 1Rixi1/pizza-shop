import ContentLoader from 'react-content-loader'

const Skeleton: React.FC = () => (
	<ContentLoader
		className='pizza-block'
		speed={2}
		width={280}
		height={500}
		viewBox='0 0 280 500'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
	>
		<circle cx='137' cy='135' r='125' />
		<rect x='0' y='275' rx='10' ry='10' width='280' height='28' />
		<rect x='0' y='325' rx='10' ry='10' width='280' height='88' />
		<rect x='126' y='426' rx='25' ry='25' width='152' height='45' />
		<rect x='0' y='434' rx='10' ry='10' width='90' height='28' />
	</ContentLoader>
)

export default Skeleton
