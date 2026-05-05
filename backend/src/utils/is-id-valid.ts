const isIdValid = (id: unknown): id is string => {
	return typeof id === "string" && isNaN(Number(id));
};

export { isIdValid };
