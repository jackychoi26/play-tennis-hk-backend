export default interface UseCase<In, Out> {
  execute(input?: In): Promise<Out>;
}
