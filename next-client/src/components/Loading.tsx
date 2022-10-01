const Loading = (props) => {
   const {isLoading, contentName} = props;
   return (
      isLoading && <div className={`loading ${contentName}`}>{`...loading ${contentName}...`}</div>
   );
}

export default Loading