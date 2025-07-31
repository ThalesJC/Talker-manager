namespace CSHARP.models
{
    public class Talker
    {
        public Talker(string name, int age, string watchedAt, int rate)
        {
            Id = Guid.NewGuid();
            Name = name;
            Age = age;
            WatchedAt = watchedAt;
            Rate = rate;
        }

        public Guid Id { get; init; }
        public string Name { get; private set; } = string.Empty;
        public int Age { get; private set; }
        public string WatchedAt { get; private set; }
        public int Rate { get; private set; }

        public void ChangeName(string newName)
        {
            Name = newName;
        }
        public void ChangeAge(int newAge)
        {
            Age = newAge;
        }
        public void ChangeDate(string newDate)
        {
            WatchedAt = newDate;
        }
        public void ChangeRate(int newRate)
        {
            Rate = newRate;
        }
        public void SetInactive()
        {
            Name = $"[Inativo] {Name}";
        }
    }
}