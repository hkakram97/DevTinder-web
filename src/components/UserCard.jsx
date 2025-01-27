const UserCard = ({ data }) => {
  const { firstName, lastName, age, gender, photoUrl, about } = data;
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="User" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{gender + " " + age}</p>}
        {about && <p>{about}</p>}
        <div className="card-actions justify-center py-2">
          <button className="btn btn-primary">Ignored</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
