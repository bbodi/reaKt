package hu.nevermind.timeline

public data class LocalizationEntry(val name: String, val localizationGenerator: (Local) -> String) {
    public fun getLocalizedText(local: Local): String {
        return localizationGenerator(local)
    }
}

public trait Local {
    public val eventFieldInt: String
    public val eventFieldFloat: String
    public val eventFieldString: String
    public val eventFieldTextArea: String
    public val eventFieldSelect: String

    class object {
        public val eventFieldInt: LocalizationEntry = LocalizationEntry("event.field.int", {it.eventFieldInt})
        public val eventFieldFloat: LocalizationEntry = LocalizationEntry("event.field.float", {it.eventFieldFloat})
        public val eventFieldString: LocalizationEntry = LocalizationEntry("event.field.string", {it.eventFieldString})
        public val eventFieldTextArea: LocalizationEntry = LocalizationEntry("event.field.textArea", {it.eventFieldTextArea})
        public val eventFieldSelect: LocalizationEntry = LocalizationEntry("event.field.select", {it.eventFieldSelect})
    }
}

public class HuLocal() : Local {
    override public val eventFieldInt = "Egész szám"
    override public val eventFieldFloat = "Valós szám"
    override public val eventFieldString = "Szöveg"
    override public val eventFieldTextArea = "Szövegdoboz"
    override public val eventFieldSelect = "Választómező"
}

public val globalLocal: Local = HuLocal()